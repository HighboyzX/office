import jsPDF from 'jspdf';
import 'jspdf-autotable';
// นำเข้าไฟล์ base64 ของฟอนต์ Sarabun
import sarabunRegular from '../../public/fonts/sarabunRegular-base64';
import sarabunBold from '../../public/fonts/sarabunBold-base64';

export const exportTableToPDF = (e, dt, button, config, columnsToExport) => {
    // First, initialize data
    const data = dt.buttons.exportData({
        columns: columnsToExport
    });

    if (!data.header || !data.body) {
        return;
    }

    // If columnsToExport is not specified or empty, use all columns
    if (!columnsToExport || columnsToExport.length === 0) {
        columnsToExport = Array.from({ length: data.header.length }, (_, i) => i);
    }

    // สร้าง PDF ใหม่
    const doc = new jsPDF({
        orientation: 'landscape', // เปลี่ยนเป็นแนวนอนเพื่อความกว้าง
        unit: 'pt', // ใช้จุดเป็นหน่วย
        format: 'A4' // ขนาดหน้า A4
    });

    // เพิ่มฟอนต์ Sarabun Regular
    doc.addFileToVFS('Sarabun-Regular.ttf', sarabunRegular);
    doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
    
    // เพิ่มฟอนต์ Sarabun Bold
    doc.addFileToVFS('Sarabun-Bold.ttf', sarabunBold);
    doc.addFont('Sarabun-Bold.ttf', 'Sarabun', 'bold');

    // กำหนดฟอนต์และขนาดฟอนต์
    doc.setFont('Sarabun');
    doc.setFontSize(14);

    // เพิ่มชื่อหัวข้อ
    doc.text(config.title, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

    // เตรียมข้อมูลหัวข้อและแถวข้อมูล
    const headers = columnsToExport.map(index => data.header[index]).filter(header => header !== undefined);
    const rows = data.body.map(row => columnsToExport.map(index => row[index]).filter(cell => cell !== undefined));

    // กำหนดค่า columnStyles ให้กับทุกคอลัมน์
    const columnStyles = {};
    for (let i = 0; i < headers.length; i++) {
        columnStyles[i] = { cellWidth: 'auto' };
    }

    // สร้างตาราง
    doc.autoTable({
        startY: 60,
        head: [headers],
        body: rows,
        margin: { top: 60, left: 10, right: 8 },
        styles: { font: 'Sarabun', fontSize: 8 }, // ปรับขนาดฟอนต์ของตาราง
        headStyles: { fillColor: [0, 102, 182], fontSize: 8, textColor: 255 }, // ปรับขนาดฟอนต์และสีฟอนต์ของหัวตาราง
        columnStyles: columnStyles, // ใช้ค่า columnStyles ที่กำหนด
        theme: 'striped'
    });

    // บันทึกไฟล์ PDF
    doc.save(config.title + '.pdf');
};
