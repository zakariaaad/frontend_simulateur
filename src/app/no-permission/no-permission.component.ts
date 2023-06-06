import { Component } from '@angular/core';

@Component({
  selector: 'app-no-permission',
  templateUrl: './no-permission.component.html',
  styleUrls: ['./no-permission.component.css']
})
export class NoPermissionComponent {

  heading = "Permission requise";
  message = "Vous n'avez pas les permissions requises pour accéder à cette page, ou vous n'avez pas un compte. Merci de consulter l'administrateur de l'application";

}
