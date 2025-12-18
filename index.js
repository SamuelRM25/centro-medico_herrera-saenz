// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    const heroTitle = document.getElementById('hero-title');

    // 1. Splash Screen Fade Out
    setTimeout(() => {
        gsap.to(splash, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                splash.style.display = 'none';
                gsap.from(heroTitle, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
                // Initialize shooting stars after splash
                createShootingStars();
            }
        });
    }, 1500);

    // Function for Shooting Stars Effect
    function createShootingStars() {
        const container = document.getElementById('shooting-stars-container');
        if (!container) return;

        const starCount = 12;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('img');
            star.src = 'logo centro medico Herrera saenz.png';
            star.className = 'shooting-star';
            container.appendChild(star);

            animateStar(star);
        }
    }

    function animateStar(star) {
        const logoColors = ['#001F61', '#1FBCD2', '#30D5C8', '#00E5FF'];
        const randomColor = logoColors[Math.floor(Math.random() * logoColors.length)];

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * -200;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;

        gsap.set(star, {
            x: startX,
            y: startY,
            opacity: 0,
            scale: 0.15 + Math.random() * 0.25,
            rotation: Math.random() * 360,
            filter: `drop-shadow(0 0 10px ${randomColor})` // Colorized glow
        });

        const tl = gsap.timeline({
            delay: delay,
            onComplete: () => animateStar(star)
        });

        tl.to(star, {
            opacity: 0.3,
            duration: 0.5
        })
            .to(star, {
                x: startX - 500,
                y: window.innerHeight + 100,
                duration: duration,
                ease: "power1.inOut"
            }, 0)
            .to(star, {
                opacity: 0,
                duration: 0.5
            }, "-=0.5");
    }

    // 2. Scroll Animation for Hero Module (Enhanced Transitions)
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero-module",
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
        }
    });

    heroTl
        .to("#hero-title", {
            scale: 0.1,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "power1.inOut"
        })
        .to(".shape", {
            scale: 8,
            opacity: 1,
            stagger: 0.1,
            duration: 1.5,
            ease: "power1.in"
        }, "-=0.5")
        .to("#hero-fade-overlay", {
            opacity: 1,
            duration: 0.5
        }, "-=0.2");

    // 3. Horizontal Scroll for Doctors Module (Alternating Slider)
    const doctorsContainer = document.querySelector("#doctors-horizontal-container");
    const drSlides = gsap.utils.toArray(".doctor-slide");

    if (doctorsContainer && drSlides.length > 0) {
        gsap.to(doctorsContainer, {
            x: () => -(doctorsContainer.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: "#doctors-module",
                pin: true,
                scrub: 1,
                start: "top top", // Ensure it starts exactly at the top
                end: () => "+=" + (doctorsContainer.scrollWidth - window.innerWidth),
                invalidateOnRefresh: true,
                snap: {
                    snapTo: 1 / (drSlides.length - 1),
                    duration: 0.6,
                    delay: 0.1,
                    ease: "power1.inOut"
                },
                onRefresh: (self) => {
                    // Force positioning on refresh to avoid skipping first slides
                    if (self.progress === 0) {
                        gsap.set(doctorsContainer, { x: 0 });
                    }
                }
            }
        });

        // Ensure everything is calculated correctly after a slight delay
        setTimeout(() => ScrollTrigger.refresh(), 500);
    }

    // 4. Scroll Reveal for Services Module
    gsap.to(".service-card", {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#services-module",
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });
});
