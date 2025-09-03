import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef;
  @ViewChildren('tableHeaders') tableHeaders!: QueryList<ElementRef>;
  @ViewChildren('tableCells') tableCells!: QueryList<ElementRef>;

  resizingColumnIndex: number | undefined;
  startX: number = 0;
  startWidth: number = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.tableContainer) {
      console.error('Table container not initialized');
    }
  }

  startResizing(event: MouseEvent, index: number) {
    event.preventDefault();
    this.resizingColumnIndex = index;
    this.startX = event.clientX;

    // Get header cell width
    const headerCell = this.tableHeaders.toArray()[index]?.nativeElement;
    if (!headerCell) {
      console.error('Header cell not found');
      return;
    }

    this.startWidth = headerCell.offsetWidth;

    document.addEventListener('mousemove', this.resizeColumn);
    document.addEventListener('mouseup', this.stopResizing);
  }

  resizeColumn = (event: MouseEvent) => {
    if (this.resizingColumnIndex === undefined) return;

    const headerCell = this.tableHeaders.toArray()[this.resizingColumnIndex]?.nativeElement;
    const newWidth = this.startWidth + (event.clientX - this.startX);

    if (newWidth > 50) { // Prevents excessive shrinking
      this.renderer.setStyle(headerCell, 'width', `${newWidth}px`);

      // Apply to all cells in the same column
      this.tableCells.forEach((cell, index) => {
        if (index % this.columns.length === this.resizingColumnIndex) {
          this.renderer.setStyle(cell.nativeElement, 'width', `${newWidth}px`);
        }
      });
    }
  };

  stopResizing = () => {
    document.removeEventListener('mousemove', this.resizeColumn);
    document.removeEventListener('mouseup', this.stopResizing);
    this.resizingColumnIndex = undefined;
  };
}