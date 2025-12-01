// FORMAT TANGGAL DD/MM/YY
 export const formatDateDDMMYY = (dateStr) => {
      if (!dateStr) return "";
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = String(dateObj.getFullYear()).padStart(4, "0").slice(2); // <-- ini kuncinya
      return `${day}/${month}/${year}`;
    };
