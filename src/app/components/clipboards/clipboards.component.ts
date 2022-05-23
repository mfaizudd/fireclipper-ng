import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { RxFormBuilder, RxFormGroup, RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { ClipboardItem } from 'src/app/models/clipboard-item';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-clipboards',
  templateUrl: './clipboards.component.html',
  styleUrls: ['./clipboards.component.scss'],
  providers: [ConfirmationService]
})
export class ClipboardsComponent implements OnInit {

  clipboardForm = <RxFormGroup>this.formBuilder.group({
    content: [
      '',
      RxwebValidators.required({ message: 'Content is required' })
    ]
  });
  formVisible = false;
  clipboards: Observable<ClipboardItem[]> | null = null;

  constructor(
    private formBuilder: RxFormBuilder,
    private auth: AuthService,
    private firestore: AngularFirestore,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {
    this.auth
      .getUser()
      .then(user => {
        if (!user) router.navigate(['login']);
        this.clipboards = this.firestore
          .collection('users')
          .doc(user?.uid)
          .collection<ClipboardItem>('clips')
          .valueChanges({ idField: 'id' })
      })
  }

  ngOnInit(): void {
  }

  toggleDialog() {
    this.formVisible = !this.formVisible;
  }

  async onSubmit() {
    const user = await this.auth.getUser();
    if (!user) {
      this.router.navigate(['login']);
    }
    const { content } = this.clipboardForm.value;
    const item: ClipboardItem = { content }
    await this.firestore
      .collection('users')
      .doc(user?.uid)
      .collection('clips')
      .add(item);
    this.formVisible = false;
  }

  async delete(event: any, clipId: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const user = await this.auth.getUser();
        if (!user) {
          this.router.navigate(['login']);
        }
        await this.firestore
          .collection('users')
          .doc(user?.uid)
          .collection('clips')
          .doc(clipId)
          .delete();
      },
      reject: () => {
        //reject action
      }
    });

  }

}
