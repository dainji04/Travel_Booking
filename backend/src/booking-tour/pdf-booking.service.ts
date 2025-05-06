import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generateBookingTourPdf(options: {
    id: number;
    userName: string;
    email: string;
    bookingDate: string;
    totalPrice: number;
    deposit: number;
    mustPay: number;
  }): Promise<string> {
    const {
      id,
      userName,
      email,
      bookingDate,
      totalPrice,
      deposit,
      mustPay,
    } = options;

    const pdfDir = path.join(__dirname, '..', '..', 'pdfs');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir);
    }

    const pdfPath = path.join(pdfDir, `booking-${id}.pdf`);
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Title
    doc.font('Helvetica-Bold')
       .fontSize(22)
       .fillColor('#0077cc')
       .text('TOUR BOOKING CONFIRMATION', { align: 'center' })
       .moveDown(1.5);

    // Booking Box
    const boxTop = doc.y;
    const boxHeight = 200;
    const boxWidth = 500;

    doc.lineWidth(1)
       .roundedRect(50, boxTop, boxWidth, boxHeight, 10)
       .stroke('#0077cc');

    doc.font('Helvetica')
       .fontSize(12)
       .fillColor('#000000');

    const infoX = 60;
    let infoY = boxTop + 15;
    const spacing = 20;

    doc.text(`Booking ID: ${id}`, infoX, infoY);
    infoY += spacing;
    doc.text(`Customer: ${userName}`, infoX, infoY);
    infoY += spacing;
    doc.text(`Email: ${email}`, infoX, infoY);
    infoY += spacing;
    doc.text(`Booking Date: ${bookingDate}`, infoX, infoY);
    infoY += spacing;
    doc.text(`Total Price: $${totalPrice.toLocaleString()}`, infoX, infoY);
    infoY += spacing;
    doc.text(`Deposit: $${deposit.toLocaleString()}`, infoX, infoY);
    infoY += spacing;
    doc.text(`Remaining: $${mustPay.toLocaleString()}`, infoX, infoY);
    // Footer
    doc.moveDown(4);
    doc.font('Helvetica-Bold')
       .fontSize(14)
       .fillColor('#0077cc')
       .text('Thank you for booking with us!', { align: 'center' });

    doc.end();
    return pdfPath;
  }
}
