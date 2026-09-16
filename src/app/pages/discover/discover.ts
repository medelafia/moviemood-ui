import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DrawerModule } from 'primeng/drawer';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

import { Content } from '../../models/content';
import { Genre } from '../../models/genre';
import { ContentService } from '../../services/content-service/content-service';
import { MovieSkeleton } from '../../components/movie-skeleton/movie-skeleton';

interface ContentType {
  name: string;
  code: 'ALL' | 'MOVIES' | 'SERIES';
}

@Component({
  selector: 'app-discover',
  imports: [
    NgOptimizedImage,
    RatingModule,
    FormsModule,
    ButtonModule,
    DrawerModule,
    CheckboxModule,
    SliderModule,
    ProgressSpinnerModule,
    MovieSkeleton,
    SelectModule,
  ],
  templateUrl: './discover.html',
  styleUrl: './discover.css',
  standalone: true,
})
export class Discover implements OnInit {
  // Services
  private readonly contentService = inject(ContentService);
  private readonly router = inject(Router);

  // State
  protected searchKey: string = '';
  isLoading: boolean = true;
  visible: boolean = false;
  page: number = 0;

  // Content
  contents: Content[] = [];
  genres: Genre[] = [{ key: 'action', name: 'action' }];

  // Filters
  selectedGenre: Genre[] = [];
  minRating: number = 0;
  rangeValues: number[] = [1990, 2020];
  selectedType: ContentType = { name: 'all', code: 'ALL' };

  // Content Types
  readonly types: ContentType[] = [
    { name: 'all', code: 'ALL' },
    { name: 'movies', code: 'MOVIES' },
    { name: 'series', code: 'SERIES' },
  ];

  // Current year for slider
  readonly currentYear = new Date().getFullYear();

  // Lifecycle
  ngOnInit(): void {
    this.contentService.getAllContent(this.page).subscribe((response) => {
      this.contents = response.content;
      this.isLoading = false;
    });
  }

  // Data Fetching
  fetchContent(type: string): void {
    const observable: Observable<any> =
      this.selectedType?.code === 'ALL'
        ? this.contentService.getAllContent(this.page, this.searchKey)
        : this.selectedType?.code === 'MOVIES'
          ? this.contentService.getAllMovies(this.page, this.searchKey)
          : this.contentService.getAllSeries(this.page, this.searchKey);

    observable.subscribe({
      next: (response) => {
        if (type === 'UPDATE') {
          this.contents = response.content;
        } else if (type === 'APPEND') {
          this.contents.push(...response.content);
        }
      },
    });
  }

  // Search & Filter
  search(): void {
    this.page = 0;
    this.fetchContent('UPDATE');
  }

  filter(event: any): void {
    this.fetchContent('UPDATE');
  }

  applyFilters(): void {
    this.visible = false;
    this.filter(null);
  }

  resetFilters(): void {
    this.rangeValues = [1900, this.currentYear];
    this.minRating = 0;
  }

  clearAllFilters(): void {
    this.selectedGenre = [];
    this.rangeValues = [1900, this.currentYear];
    this.minRating = 0;
    this.selectedType = { name: 'all', code: 'ALL' };
    this.searchKey = '';
    this.search();
  }

  removeGenreFilter(genre: Genre): void {
    this.selectedGenre = this.selectedGenre.filter(
      (g) => g.key !== genre.key
    );
    this.filter(null);
  }

  toggleGenre(genre: Genre): void {
    const index = this.selectedGenre.findIndex((g) => g.key === genre.key);
    if (index > -1) {
      this.selectedGenre = this.selectedGenre.filter((g) => g.key !== genre.key);
    } else {
      this.selectedGenre = [...this.selectedGenre, genre];
    }
  }

  onGenreChange(event: any): void {
    // Handle genre change
  }

  // Pagination
  incrementSize(): void {
    this.page += 1;
    this.fetchContent('APPEND');
  }

  // Navigation
  navigate(contentId?: number): void {
    this.router.navigate([`/${contentId}/details`]);
  }

  // Utilities
  onImageError(): string {
    return 'public/assets/image.png';
  }

  constructGenresNames(arr?: Genre[]): string {
    return arr?.map((element) => element.name).join(', ') || '';
  }

  trackByContentId(index: number, content: Content): number {
    return content.id!;
  }

  trackByGenreKey(index: number, genre: Genre): string {
    return genre.key;
  }

  // Template Helper Methods
  isGenreSelected(genre: Genre): boolean {
    return this.selectedGenre.some((g) => g.key === genre.key);
  }

  getSelectedGenreCount(): number {
    return this.selectedGenre.length;
  }

  getPosterLink(link?: string): string {
    return link || 'assets/images/image.png';
  }
}