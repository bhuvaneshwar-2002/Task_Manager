import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() headerColor = '#2196F3';
  @Input() oddRowColor = '#f9f9f9';
  @Input() evenRowColor = '#fff';
  @Input() loadBatchSize = 10; // Number of rows to load at a time

  searchTerm = '';
  sortColumn = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  visibleData: any[] = [];
  loading = false;
  currentBatch = 1;

  constructor() {
    this.visibleData = this.data.slice(0, this.loadBatchSize);
  }

  get filteredData() {
    return this.data.filter(row =>
      this.columns.some(col => row[col]?.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  sort(column: string) {
    this.sortOrder = this.sortColumn === column && this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;
  }

  get sortedData() {
    return [...this.filteredData].sort((a, b) => {
      if (a[this.sortColumn] > b[this.sortColumn]) return this.sortOrder === 'asc' ? 1 : -1;
      if (a[this.sortColumn] < b[this.sortColumn]) return this.sortOrder === 'asc' ? -1 : 1;
      return 0;
    });
  }

  // @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 10 && !this.loading) {
      this.loadMoreData();
    }
  }

  loadMoreData() {
    if (this.visibleData.length >= this.sortedData.length) return;

    this.loading = true;
    setTimeout(() => {
      const nextBatch = this.sortedData.slice(
        this.currentBatch * this.loadBatchSize,
        (this.currentBatch + 1) * this.loadBatchSize
      );

      this.visibleData = [...this.visibleData, ...nextBatch];
      this.currentBatch++;
      this.loading = false;
    }, 1000); // Simulating API delay
  }
}

// function HostListener(arg0: string, arg1: string[]): (target: TableComponent, propertyKey: "onScroll", descriptor: TypedPropertyDescriptor<(event: Event) => void>) => void | TypedPropertyDescriptor<(event: Event) => void> {
//   throw new Error('Function not implemented.');
// }
