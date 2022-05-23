import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RxFormBuilder, RxFormGroup, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-clipboards',
  templateUrl: './clipboards.component.html',
  styleUrls: ['./clipboards.component.scss']
})
export class ClipboardsComponent implements OnInit {

  clipboardForm = <RxFormGroup>this.formBuilder.group({
    content: [
      '',
      RxwebValidators.required({ message: 'Content is required'})
    ]
  });
  formVisible = false;

  constructor(
    private formBuilder: RxFormBuilder,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

  toggleDialog() {
    this.formVisible = !this.formVisible;
  }

  onSubmit() {

  }

}
