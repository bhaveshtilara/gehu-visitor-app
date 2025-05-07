import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import VisitorModel from '@/models/Visitor';
import { Visitor } from '@/types/visitor';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/signin');
  }

  await dbConnect();

  const visitors = (await VisitorModel.find().lean()) as Visitor[];

  // Convert visitors to plain objects for serialization
  const serializedVisitors = visitors.map((visitor) => ({
    ...visitor,
    _id: visitor._id.toString(),
    createdAt: visitor.createdAt ? new Date(visitor.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: visitor.updatedAt ? new Date(visitor.updatedAt).toISOString() : new Date().toISOString(),
    visits: visitor.visits.map((visit: any) => ({
      ...visit,
      _id: visit._id.toString(),
      date: visit.date ? new Date(visit.date).toISOString() : new Date().toISOString(),
      exitDate: visit.exitDate ? new Date(visit.exitDate).toISOString() : null,
    })),
  }));

  // Analytics: Total Visitors
  const totalVisitors = serializedVisitors.length;

  // Analytics: Visitors by Category
  const visitorsByCategory = {
    Student: 0,
    Parent: 0,
    Vendor: 0,
    Guest: 0,
  };
  serializedVisitors.forEach((visitor) => {
    visitorsByCategory[visitor.category] = (visitorsByCategory[visitor.category] || 0) + 1;
  });

  // Analytics: Daily Visits (last 7 days)
  const dailyVisits: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    const visitCount = serializedVisitors.reduce((count, visitor) => {
      return (
        count +
        visitor.visits.filter((visit) => visit.date.startsWith(dateString)).length
      );
    }, 0);
    dailyVisits.push({ date: dateString, count: visitCount });
  }

  return (
    <AdminDashboardClient
      visitors={serializedVisitors}
      totalVisitors={totalVisitors}
      visitorsByCategory={visitorsByCategory}
      dailyVisits={dailyVisits}
    />
  );
}