import React from "react";
import { useTranslation } from "react-i18next";

export default function SortItems({ onSortChange }) {
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    onSortChange(selectedSortOption); 
  };
  const [ t, i18n ] = useTranslation("global");
  return (
    <div>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleSortChange}
      >
      <option value="priceLowToHigh">{t("sortBy.priceLowToHigh")}</option>
      <option value="priceHighToLow">{t("sortBy.priceHighToLow")}</option>
      <option value="nameAZ">{t("sortBy.nameAZ")}</option>
      <option value="nameZA">{t("sortBy.nameZA")}</option>
      </select>
    </div>
  );
}
