import { Component } from '@angular/core';
import { TableComponent } from '../components/table/table.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {

  columns = ['ID', 'Username', 'Role', 'Status'];
  data = [
    { ID: 1, Username: 'john_doe', Role: 'ADMIN', Status: 'Active' },
    { ID: 2, Username: 'jane_doe', Role: 'USER', Status: 'Inactive' }
  ];
}
