import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ButtonModule , RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  heroSearchKey = '';
  newsletterEmail = '';

  subscribeNewsletter(): void {
    if (!this.newsletterEmail.trim()) return;
    // Wire this to your backend subscription endpoint
    console.log('Subscribe:', this.newsletterEmail);
  }
  ngAfterViewInit(): void {
    this.animateCounters();
  }

  heroSearch(): void {
    if (!this.heroSearchKey.trim()) return;
    // Navigate to discover with the search query
    // this.router.navigate(['/discover'], { queryParams: { q: this.heroSearchKey } });
  }

  private animateCounters(): void {
    const counters = document.querySelectorAll<HTMLElement>('.stat-number');

    counters.forEach((counter) => {
      const target = Number(counter.dataset['target'] ?? 0);
      const duration = 1500;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);

        // Format with K for large numbers
        counter.textContent =
          target >= 1000
            ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K+`
            : `${value}%`;

        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  }
}
