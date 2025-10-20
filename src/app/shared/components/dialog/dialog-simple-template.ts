import {Component, inject, model, computed} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChip} from "@angular/material/chips";

@Component({
  selector: 'dialog-simple-template',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatChip,
    MatIcon,
    ReactiveFormsModule,
    MatDialogClose,
    FormsModule
  ],
  templateUrl: 'dialog-simple-template.html'
})

export class DialogSimpleTemplate {

  readonly dialogRef = inject(MatDialogRef<DialogSimpleTemplate>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly product = model(this.data.product);
  imageUrl = computed(() => `http://localhost:3000${this.product()?.image ? this.product()?.image : ""}`);
  specifics = computed(() => {
    const arr = [];
    if (this.product().warning) arr.push({label: "Warning", value: this.product().warning});
    if (this.product().specifications) {
      this.product().specifications.forEach((specification: any) => arr.push(specification))
    }
    return arr;
  })
  formatedPrice = computed(() => {
    let str = this.product().price.toString();
    return `${str.substring(0, str.length - 3)} ${str.substring(str.length - 3, str.length)}`
  })

  onCancel(): void {
    this.dialogRef.close();
  }

}