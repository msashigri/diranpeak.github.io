import jsPDF from 'jspdf';
import { Booking } from '../context/AuthContext';

/**
 * Generates and triggers the immediate download of an official A4 PDF Booking Voucher
 * with Government of Pakistan DTS License #1842 credentials, QR verification block,
 * and expedition logistical summary.
 */
export const downloadBookingVoucherPDF = (
  booking: Booking,
  currencySymbol = '$'
): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // --- BRAND COLORS ---
  const primaryNavy = [26, 43, 72]; // #1a2b48
  const brandBlue = [81, 145, 250]; // #5191fa
  const emeraldGreen = [16, 149, 93]; // #10955d
  const slateDark = [51, 65, 85]; // #334155
  const slateMuted = [100, 116, 139]; // #64748b
  const slateLight = [241, 245, 249]; // #f1f5f9
  const borderGray = [226, 232, 240]; // #e2e8f0

  // --- 1. HEADER ACCENT STRIP ---
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, pageWidth, 7, 'F');

  doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.rect(margin, 7, contentWidth, 1.5, 'F');

  // --- 2. COMPANY HEADER & REGISTRATION CREDENTIALS ---
  let y = 16;

  // Company Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('DIRAN PEAK ADVENTURE', margin, y);

  // Subtitle / License
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.text('GOVERNMENT OF PAKISTAN · LICENSED TOUR OPERATOR (DTS LIC. #1842)', margin, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('Karakoram · Himalayas · Hindu Kush Mountaineering & Trekking Services', margin, y + 8.5);
  doc.text('Main Alpine Bazaar, Gilgit & Blue Area, Islamabad | info@diranpeakadventure.com | +92 345 6412992', margin, y + 12);

  // Top-Right Voucher Badge
  doc.setFillColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.roundedRect(pageWidth - margin - 58, y - 2, 58, 14, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL BOOKING VOUCHER', pageWidth - margin - 29, y + 3.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('GUARANTEED DEPARTURE', pageWidth - margin - 29, y + 8, { align: 'center' });

  y += 18;

  // Horizontal divider
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);

  y += 5;

  // --- 3. QUICK REFERENCE SUMMARY BAR ---
  doc.setFillColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'D');

  const colWidth = contentWidth / 4;

  // Col 1: Reference Code
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('VOUCHER CODE', margin + 4, y + 5);
  doc.setFont('courier', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.text(booking.bookingCode, margin + 4, y + 12);

  // Col 2: Date Issued
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('DATE ISSUED', margin + colWidth + 4, y + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(booking.bookingDate || new Date().toISOString().split('T')[0], margin + colWidth + 4, y + 12);

  // Col 3: Status
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('BOOKING STATUS', margin + colWidth * 2 + 4, y + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.text(booking.status || 'Confirmed', margin + colWidth * 2 + 4, y + 12);

  // Col 4: Total Reserved
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('TOTAL AMOUNT', margin + colWidth * 3 + 4, y + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(`${currencySymbol}${Math.round(booking.totalPrice).toLocaleString()} USD`, margin + colWidth * 3 + 4, y + 12);

  y += 24;

  // --- 4. TWO-COLUMN DETAILS: LEAD TRAVELER & EXPEDITION ITINERARY ---
  const halfWidth = (contentWidth - 6) / 2;

  // LEFT BOX: Lead Traveler Credentials
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, y, halfWidth, 48, 2, 2, 'D');

  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(margin, y, halfWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('LEAD TRAVELER & PARTY DETAILS', margin + 4, y + 4.8);

  let ly = y + 13;
  const printRow = (label: string, val: string, isRightCol = false) => {
    const xBase = isRightCol ? margin + halfWidth + 6 : margin + 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(label.toUpperCase(), xBase, ly);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    const maxTextWidth = halfWidth - 8;
    const split = doc.splitTextToSize(val, maxTextWidth);
    doc.text(split[0] || 'N/A', xBase, ly + 4);
  };

  printRow('Full Passenger Name', booking.customerName || 'Registered Traveler');
  ly += 9;
  printRow('Email Address', booking.customerEmail || 'traveler@diranpeak.com');
  ly += 9;
  printRow('WhatsApp / Phone', booking.customerPhone || '+92 345 6412992');
  ly += 9;
  const partyInfo = `${booking.adults || 1} Adult(s)${booking.children && booking.children > 0 ? ` + ${booking.children} Youth` : ''}${booking.singleTent ? ' (Single Tent Supplement)' : ''}`;
  printRow('Party Size & Tenting', partyInfo);

  // RIGHT BOX: Tour & Itinerary Information
  doc.roundedRect(margin + halfWidth + 6, y, halfWidth, 48, 2, 2, 'D');
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(margin + halfWidth + 6, y, halfWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('EXPEDITION & DEPARTURE DETAILS', margin + halfWidth + 10, y + 4.8);

  ly = y + 13;
  const printRowRight = (label: string, val: string) => {
    printRow(label, val, true);
  };

  printRowRight('Expedition Title', booking.tourTitle || 'Karakoram Mountain Tour');
  ly += 9;
  printRowRight('Duration & Days', `${booking.duration || '14 Days'} (Fully Guided)`);
  ly += 9;
  printRowRight('Scheduled Start Date', booking.startDate || 'Immediate / On Request');
  ly += 9;
  printRowRight('Return / End Date', booking.endDate || 'Calculated Return');

  y += 54;

  // --- 5. INCLUDED LOGISTICS & HIGH ALTITUDE GEAR PROVISIONS ---
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'D');

  doc.setFillColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('CONFIRMED EXPEDITION INCLUSIONS & LOGISTICAL SUPPORT', margin + 4, y + 4.8);

  const inclusions = [
    '• Licensed Balti Mountain Guide & Certified High-Altitude Sirdar',
    '• Porterage & Camp Baggage Handling up to 20kg per Climber',
    '• All Base Camp Camping Gear (2-Person Mountain Hardwear Tents, Mess Tent & Foam Mattresses)',
    '• Full Board Expedition Meals (Fresh Balti Cuisine, Boiled Glacier Water, Hot Tea/Coffee)',
    '• 24/7 Satellite inReach Communications, SOS Evacuation Protocol & High-Altitude First Aid Box',
    '• Government Royalty Fees, National Park Entry Permits, Bridge Tolls & Camping Fees',
    '• Domestic Airport Transfers (Islamabad / Skardu / Gilgit) & 4x4 Mountain Jeeps'
  ];

  let incY = y + 11.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);

  inclusions.forEach((item) => {
    doc.text(item, margin + 4, incY);
    incY += 3.8;
  });

  y += 44;

  // --- 6. SPECIAL REQUESTS / CLIMBER NOTES (IF PRESENT) ---
  if (booking.specialRequests) {
    doc.setFillColor(254, 249, 195); // amber-50
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
    doc.setDrawColor(253, 224, 71); // amber-300
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(161, 98, 7);
    doc.text('SPECIAL CLIMBER NOTES & DIETARY REQUIREMENTS:', margin + 4, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(113, 63, 18);
    const splitNotes = doc.splitTextToSize(booking.specialRequests, contentWidth - 8);
    doc.text(splitNotes[0] || '', margin + 4, y + 9);

    y += 18;
  }

  // --- 7. VERIFICATION QR CODE, SECURITY STAMP & SIGNATURE BLOCK ---
  const stampBoxHeight = 44;
  doc.setFillColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.roundedRect(margin, y, contentWidth, stampBoxHeight, 2, 2, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, y, contentWidth, stampBoxHeight, 2, 2, 'D');

  // Simulated QR Code Frame on Left
  const qrX = margin + 4;
  const qrY = y + 4;
  const qrSize = 36;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX, qrY, qrSize, qrSize, 2, 2, 'F');
  doc.setDrawColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(qrX, qrY, qrSize, qrSize, 2, 2, 'D');

  // Draw decorative QR Matrix pattern simulation
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  // Top-left finder
  doc.rect(qrX + 3, qrY + 3, 9, 9, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX + 5, qrY + 5, 5, 5, 'F');
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(qrX + 6.5, qrY + 6.5, 2, 2, 'F');

  // Top-right finder
  doc.rect(qrX + qrSize - 12, qrY + 3, 9, 9, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX + qrSize - 10, qrY + 5, 5, 5, 'F');
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(qrX + qrSize - 8.5, qrY + 6.5, 2, 2, 'F');

  // Bottom-left finder
  doc.rect(qrX + 3, qrY + qrSize - 12, 9, 9, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX + 5, qrY + qrSize - 10, 5, 5, 'F');
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(qrX + 6.5, qrY + qrSize - 8.5, 2, 2, 'F');

  // Pixel Grid pattern
  const gridOffsets = [
    [15, 4], [19, 4], [23, 7], [15, 11], [18, 14], [22, 14],
    [5, 15], [9, 17], [13, 19], [17, 19], [25, 19], [7, 21],
    [15, 24], [19, 25], [23, 27], [14, 29], [18, 31], [22, 31]
  ];
  gridOffsets.forEach(([gx, gy]) => {
    doc.rect(qrX + gx, qrY + gy, 2.5, 2.5, 'F');
  });

  // Middle Text Verification Info
  const midX = qrX + qrSize + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('OFFICIAL VERIFICATION CODE & DISPATCH', midX, y + 8);

  doc.setFont('courier', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.text(`VERIFIED: https://diranpeakadventure.com/verify?code=${booking.bookingCode}`, midX, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('This voucher is an authorized electronic travel document issued under Government of Pakistan', midX, y + 18);
  doc.text('Department of Tourist Services Lic. #1842. Present this document upon arrival at Islamabad/Skardu', midX, y + 22);
  doc.text('Airport or the Diran Peak Adventure operations office for briefing and trek registration.', midX, y + 26);
  doc.text('24/7 Operations Hotline & WhatsApp: +92 345 6412992 | info@diranpeakadventure.com', midX, y + 30);

  // Right Official Seal / Stamp
  const sealX = pageWidth - margin - 38;
  const sealY = y + 5;
  doc.setDrawColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.setLineWidth(0.8);
  doc.circle(sealX + 16, sealY + 16, 14, 'D');
  doc.setDrawColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.circle(sealX + 16, sealY + 16, 12, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('DIRAN PEAK ADVENTURE', sealX + 16, sealY + 10, { align: 'center' });
  doc.text('★ DTS LIC. #1842 ★', sealX + 16, sealY + 14, { align: 'center' });
  doc.setFontSize(6);
  doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.text('AUTHENTICATED', sealX + 16, sealY + 18, { align: 'center' });
  doc.setFontSize(4.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('ISLAMABAD & GILGIT', sealX + 16, sealY + 22, { align: 'center' });

  y += stampBoxHeight + 8;

  // --- 8. FOOTER WITH ACCENT & PAGE INFO ---
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('DIRAN PEAK ADVENTURE · DTS LIC. #1842 · COPYRIGHT ' + new Date().getFullYear(), margin, pageHeight - 4);
  doc.text('ELECTRONIC VOUCHER · PAGE 1 OF 1', pageWidth - margin, pageHeight - 4, { align: 'right' });

  // Trigger browser download
  const cleanFilename = `DiranPeakAdventure_Voucher_${booking.bookingCode}.pdf`;
  doc.save(cleanFilename);
};
