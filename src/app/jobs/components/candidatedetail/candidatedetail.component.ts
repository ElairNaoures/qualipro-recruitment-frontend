import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondidatService } from '../../../shared/services/condidat.service';
import { CondidatModel } from '../../../shared/models/Condidat.model';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-candidatedetail',
  templateUrl: './candidatedetail.component.html',
  styleUrls: ['./candidatedetail.component.scss']
})
export class CandidatedetailComponent implements OnInit {
  condidatId: number = 0; 
  condidat: CondidatModel | undefined;
  showPersonalInfo = false;
  showEducationInfo = false;
  showExperienceInfo = false;

  constructor(
    private route: ActivatedRoute,
    private condidatService: CondidatService,
    private authService: AuthService,
    private router: Router
  ) {}



  ngOnInit(): void {
    // Récupération de l'ID du candidat depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.condidatId = +params.get('condidatId')!;
    
      if (this.condidatId) {
        console.log('Candidate ID:', this.condidatId);
        this.loadCondidat(); // Appel pour charger les données du candidat
      } else {
        console.error('No candidate ID provided');
      }
    });
  }

  loadCondidat(): void {
    if (this.condidatId !== undefined) {
      this.condidatService.getCondidatById(this.condidatId).subscribe(condidat => {
        this.condidat = condidat;
      }, error => {
        console.error('Error fetching condidat:', error);
      });
    }
  }

  togglePersonalInfo() {
    this.showPersonalInfo = !this.showPersonalInfo;
  }

  toggleEducationInfo() {
    this.showEducationInfo = !this.showEducationInfo;
  }

  toggleExperienceInfo() {
    this.showExperienceInfo = !this.showExperienceInfo;
  }

  viewCV() {
    // Logique pour voir le CV, par exemple, ouvrir un lien
    const cvUrl = `/jobs/condidatsCv/${this.condidatId}`;
    window.open(cvUrl, '_blank');
  }

  navigateToJobList(): void {
    this.router.navigate(['/jobs/jobs-lien/list'], { queryParams: { condidatId: this.condidatId } }); 
  }
  logout() {
    this.authService.logout(); // Assurez-vous que cette méthode existe pour gérer la déconnexion
    this.router.navigate(['/auth/sign-in']); // Rediriger vers la page de connexion après déconnexion
  }
}
