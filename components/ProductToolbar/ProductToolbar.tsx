"use client";

import { useEffect, useRef, useState } from "react";
import type { SortOption, SortOptionValue } from "@/types/product";
import { SORT_OPTIONS } from "@/lib/constants";
import { CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";
import styles from "./ProductToolbar.module.css";

type ProductToolbarProps = {
  itemCount: number;
  filtersHidden: boolean;
  onToggleFilters: () => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

export function ProductToolbar({
  itemCount,
  filtersHidden,
  onToggleFilters,
  sort,
  onSortChange,
}: ProductToolbarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const activeSort = SORT_OPTIONS.find((option) => option.value === sort) ?? SORT_OPTIONS[0];

  useEffect(() => {
    if (!sortOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSortOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [sortOpen]);

  const handleSelect = (option: SortOptionValue) => {
    onSortChange(option.value);
    setSortOpen(false);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <span className={styles.count}>{itemCount} ITEMS</span>
        <button
          type="button"
          className={styles.filterToggle}
          onClick={onToggleFilters}
          aria-pressed={!filtersHidden}
        >
          <span className={styles.chevron}>
            {filtersHidden ? <ChevronRightIcon width={14} height={14} /> : <ChevronLeftIcon width={14} height={14} />}
          </span>
          {filtersHidden ? "SHOW FILTER" : "HIDE FILTER"}
        </button>
      </div>

      <div className={styles.right} ref={sortRef}>
        <button
          type="button"
          className={styles.sortButton}
          aria-haspopup="listbox"
          aria-expanded={sortOpen}
          onClick={() => setSortOpen((open) => !open)}
        >
          {activeSort.label}
          <ChevronDownIcon width={16} height={16} />
        </button>

        {sortOpen && (
          <ul className={styles.sortMenu} role="listbox" aria-label="Sort products">
            {SORT_OPTIONS.map((option) => (
              <li key={option.value} role="option" aria-selected={option.value === sort}>
                <button
                  type="button"
                  className={styles.sortOption}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option.label}</span>
                  {option.value === sort && <CheckIcon width={14} height={14} />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
