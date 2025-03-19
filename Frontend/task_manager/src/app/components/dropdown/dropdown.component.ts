import { Component , EventEmitter, Input , Output} from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  @Input() items: string[] = [];
  @Input() placeholder = 'Select an option';
  @Input() allowSearch = false;
  @Output() selected = new EventEmitter<string>();

  isOpen = false;
  selectedItem?: string;
  searchTerm = '';

  toggleDropdown() { this.isOpen = !this.isOpen; }

  selectItem(item: string) {
    this.selectedItem = item;
    this.selected.emit(item);
    this.isOpen = false;
  }

  get filteredItems() {
    return this.items.filter(item => item.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
