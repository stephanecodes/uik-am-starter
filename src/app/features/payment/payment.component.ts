import { Component, ViewChild, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { UikIntlTelInputComponent, UikValidators, UikAmModule } from "@visiativ/uik-am";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [
        CommonModule,
        PageLayoutComponent,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        UikIntlTelInputComponent,
        MatDialogModule,
        UikAmModule,
        RouterModule
    ],
    templateUrl: './payment.component.html'
})
export class PaymentComponent {

    @ViewChild('paymentDialog') paymentDialog!: TemplateRef<any>;
    @ViewChild('paymentCompleteDialog') paymentCompleteDialog!: TemplateRef<any>;

    protected readonly telControl: FormControl;
    protected readonly formGroup: FormGroup;

    private paymentCompleteDialogRef!: MatDialogRef<any>;

    constructor(private dialog: MatDialog, private router: Router) {
        this.telControl = new FormControl('+33 605-040-302', {
            validators: [UikValidators.telNumberValidator()],
            updateOn: 'blur'
        });

        this.formGroup = new FormGroup({ tel: this.telControl });

        this.formGroup.valueChanges.subscribe(value => {
            console.log('Form value changed:', value);
        });
    }

    submitPayment() {
        const dialogRef = this.dialog.open(this.paymentDialog, {
            disableClose: true,
            width: '400px',
            height: '200px'
        });

        setTimeout(() => {
            dialogRef.close();
            this.paymentCompleteDialogRef = this.dialog.open(this.paymentCompleteDialog, {
                width: '400px',
                height: '200px'
            });
        }, 3000);
    }

    backToHome() {
        this.paymentCompleteDialogRef.close();

        this.router.navigate(['/home']);
    }
}