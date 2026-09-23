"use client";

import { useCallback, useEffect, useState } from "react";
import { FILTER_SECTIONS } from "@/lib/constants";
import { ChevronDownIcon, CloseIcon } from "@/components/Icons";
import styles from "./FilterSidebar.module.css";

type SidebarContentProps = {
  onClose?: () => void;
  isMobile: boolean;
};

function SidebarContent({ onClose, isMobile }: SidebarContentProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (key: string) => {
    setOpenSections((current) =>
      current.includes(key) ? current.filter((k) => k !== key) : [...current, key]
    );
  };

  return (
    <div className={isMobile ? styles.mobileContent : styles.sidebarContent}>
      {isMobile && (
        <div className={styles.mobileHeader}>
          <span className={styles.mobileTitle}>FILTER</span>
          <button type="button" className={styles.iconButton} aria-label="Close filters" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      )}

      {FILTER_SECTIONS.map((section) => {
        const isOpen = openSections.includes(section.key);
        const panelId = `filter-panel-${section.key}`;
        const buttonId = `filter-button-${section.key}`;
        return (
          <div key={section.key} className={styles.section}>
            <button
              type="button"
              id={buttonId}
              className={styles.sectionHeader}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleSection(section.key)}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.sectionChevron} data-open={isOpen}>
                <ChevronDownIcon width={16} height={16} />
              </span>
            </button>
            <span className={styles.sectionValue}>{section.value}</span>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p className={styles.sectionHint}>
                {`Filtering by ${section.title.toLowerCase()} is available in the full experience.`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type FilterSidebarProps = {
  filtersHidden: boolean;
  onRestoreFilters: () => void;
};

export function FilterSidebar({ filtersHidden, onRestoreFilters }: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen, closeMobile]);

  const handleRestore = () => {
    onRestoreFilters();
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={styles.sidebar} data-hidden={filtersHidden}>
        <SidebarContent isMobile={false} />
        {filtersHidden && (
          <button type="button" className={styles.restoreButton} onClick={handleRestore}>
            SHOW FILTER
          </button>
        )}
      </aside>

      {/* Mobile trigger + drawer */}
      <div className={styles.mobileTriggerRow}>
        <button type="button" className={styles.mobileTrigger} onClick={() => setIsMobileOpen(true)}>
          FILTER
        </button>
      </div>

      {isMobileOpen && (
        <>
          <div className={styles.overlay} onClick={closeMobile} aria-hidden="true" />
          <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Filters">
            <SidebarContent onClose={closeMobile} isMobile />
          </div>
        </>
      )}
    </>
  );
}
