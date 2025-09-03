import { Component, EventEmitter, Input, OnInit, Output, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit {
  @Input() fields: { name: string; label: string; type: string; validators: any[] }[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  
  form!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.fields.forEach(field => {
      this.form.addControl(field.name, this.fb.control('', field.validators));
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}


