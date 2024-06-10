import ExcelJS from 'exceljs';

export const exportTableToExcel = (e, dt, button, config, columnsToExport) => {
    // Get the export data
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

    // Filter out invalid indices
    const validColumnsToExport = columnsToExport.filter(index => index < data.header.length);

    // Create a workbook and add a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add the header row with styling
    const headers = validColumnsToExport.map(index => data.header[index] || '');
    const headerRow = worksheet.addRow(headers);

    // Apply styling to the header row
    headerRow.eachCell((cell, colNumber) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '0066b6' },
            bgColor: { argb: '0066b6' },
        };
        cell.font = { bold: true, color: { argb: 'ffffff' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Add the data rows
    data.body.forEach(row => {
        const rowData = validColumnsToExport.map(index => row[index] || '');
        worksheet.addRow(rowData);
    });

    // Adjust column widths
    worksheet.columns = headers.map((header, index) => {
        const maxLength = Math.max(
            header.length,
            ...data.body.map(row => (row[validColumnsToExport[index]]?.toString().length || 0))
        );

        return {
            header: header,
            key: `col${index}`,
            width: maxLength + 2 // Adding some padding for better readability
        };
    });

    // Generate Excel file and download it
    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = config.title + '.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
};
