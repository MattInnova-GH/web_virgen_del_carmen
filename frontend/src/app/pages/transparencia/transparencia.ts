import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transparencia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transparencia.html',
  styleUrls: ['./transparencia.css'],
})
export class Transparencia implements OnInit, OnDestroy {
  currentSlide = 0;
  private intervalId: any;

  readonly totalSlides = 3;
  readonly delay = 4000;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  // CONTROL DEL CARRUSEL

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.resetAutoPlay();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoPlay();
  }

  // 🔁 AUTOPLAY

  startAutoPlay() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    }, this.delay);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
