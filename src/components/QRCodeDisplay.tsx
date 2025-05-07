'use client';

import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
}

export default function QRCodeDisplay({ value }: QRCodeDisplayProps) {
  return <QRCodeCanvas value={value} size={128} />;
}