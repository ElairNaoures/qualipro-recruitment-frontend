import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-quiz',
  templateUrl: './fin-quiz.component.html',
  styleUrls: ['./fin-quiz.component.scss']
})
export class FinQuizComponent implements OnInit, OnDestroy {
  minutes = 0;
  seconds = 6;
  interval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.logout(); // Déconnexion après 2 minutes
          return;
        }
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('condidatId');
    this.router.navigate(['/auth/sign-in']);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
