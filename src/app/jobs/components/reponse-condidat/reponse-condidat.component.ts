import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-reponse-condidat',
  templateUrl: './reponse-condidat.component.html',
  styleUrls: ['./reponse-condidat.component.scss']
})
export class ReponseCondidatComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logoutAndRedirect(): void {
    // Déconnexion
    this.authService.logout(); // Vous pouvez aussi directement manipuler le stockage ici
    
    // Redirection vers la page de connexion
    this.router.navigate(['/auth/sign-in']).then(() => {
      // Après la redirection vers la page de connexion, naviguer vers la page cible
      this.router.navigate(['/jobs/jobs-lien']);
    });
  }
}
