import dbConnect from './mongodb';
import Visitor from '@/models/Visitor';

export async function fetchVisitors() {
  await dbConnect();
  const visitors = await Visitor.find({}).lean();
  return visitors;
}