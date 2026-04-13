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
  private autoPlayInterval: any;
  private readonly autoPlayDelay = 3000;

  ngOnInit() {
    this.initCarousel();
    this.initScrollAnimations();
    this.initButtonListeners();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  // Carousel methods
  private initCarousel() {
    this.startAutoPlay();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoPlay();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % 3;
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + 3) % 3;
    this.resetAutoPlay();
  }

  startAutoPlay() {
    if (this.autoPlayInterval) return;
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  private resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  // Scroll animations
  private initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll('.info-card, .carousel-item, .sidebar-item').forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(20px)';
        (el as HTMLElement).style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
      });
    }, 100);
  }

  // Button listeners
  private initButtonListeners() {
    document.querySelectorAll('.quick-btn, .info-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        (card as HTMLElement).style.transform = 'translateY(-5px)';
      });
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'translateY(0)';
      });
    });
  }

  showAlert(section: string) {
    alert(`Sección: ${section}\n\nAquí se redirigiría a la página de ${section}`);
  }
}
