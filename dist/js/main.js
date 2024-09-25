jQuery(document).ready(function ($) {
	$('input[type="tel"]').inputmask({ mask: '+38 (999) 999-99-99' });

	$(document).on('mouseup', function (e) {
		const menu = $('nav');
		const menuBtn = $('.header__menu-btn');
		const headerPhones = $('.header__phones');
		const filter = $('.filter');

		if (!menu.is(e.target) && menu.has(e.target).length === 0 && !menuBtn.is(e.target)) {
			menu.removeClass('open');
			menuBtn.removeClass('open');
			disableScroll(false);
		}

		if (!headerPhones.is(e.target) && !headerPhones.has(e.target).length) {
			headerPhones.removeClass('open');
		}

		if (!filter.is(e.target) && !filter.has(e.target).length) {
			filter.removeClass('open');
		}
	});

	function headerHeight() {
		$('header').css('--offset-header', `${$('header').height()}px`);
		$('section:first-child').css('--offset-header', `${$('header').height()}px`);
		$('.header__submenu-items').css('--offset-header', `${$('header').height()}px`);
	}

	headerHeight();

	function disableScroll(scroll) {
		if (scroll) {
			$('html').addClass('no-scroll');
		} else {
			$('html').removeClass('no-scroll');
		}
	}

	function headerMenuDropdown() {
		if ($(window).width() > 1600) {
			$('.header__submenu.btn--dropdown').on('mouseenter', function () {
				$(this).addClass('open');
				disableScroll(true);
			});
			$('.header__submenu.btn--dropdown').on('mouseleave', function () {
				$(this).removeClass('open');
				disableScroll(false);
			});
		} else if ($('.header__submenu.btn--dropdown').hasClass('open')) {
			$('.header__submenu.btn--dropdown').removeClass('open');
		}
	}
	headerMenuDropdown();

	function mobileNav() {
		if ($(window).width() <= 1600) {
			$('.header__submenu.btn--dropdown > a').click(function () {
				const currentItemName = $(this).text();
				$('.header__submenu-current span').text(currentItemName).parents('.header__submenu-current').addClass('active');
				$(this).parents('.header__submenu.btn--dropdown').addClass('open-menu--item');
				$('.header__menu').addClass('open-menu');
			});

			$('.header__submenu .header__submenu-item').click(function () {
				const currentItemName = $(this).children('.header__submenu-title').text();
				$('.header__submenu-current span').text(currentItemName).parents('.header__submenu-current').addClass('active-sub');
				$(this).parents('.header__submenu-wrap').addClass('open-submenu');
				$(this).addClass('open-submenu--item');
			});

			$('.header__submenu-current').on('click', function () {
				if ($(this).hasClass('active-sub')) {
					$(this).removeClass('active-sub');
					$('.header__submenu .header__submenu-item').removeClass('open-submenu--item');
					$('.header__submenu-wrap').removeClass('open-submenu');

					$('.header__submenu-current span').text($('.header__submenu.open-menu--item > a').text());
				} else if ($(this).hasClass('active')) {
					$('.header__submenu.btn--dropdown.open-menu--item').removeClass('open-menu--item');
					$('.header__menu.open-menu').removeClass('open-menu');
					$('.header__submenu-current span').text('').parents('.header__submenu-current').removeClass('active');
				}
			});
		}
	}
	mobileNav();

	$('.header__menu-btn').click(function () {
		$(this).toggleClass('open');
		$('.header__bottom').toggleClass('open');
		if ($(this).hasClass('open')) {
			disableScroll(true);
		} else {
			disableScroll(false);
		}
	});

	$('.header__phones').click(function () {
		$(this).toggleClass('open');
	});

	$(window).on('resize', function () {
		headerHeight();
		headerMenuDropdown();
		mobileNav();
	});

	$(document).scroll(function () {
		let height = $(window).scrollTop();

		if (height > 40) {
			$('header').addClass('header--offset');
		} else {
			$('header').removeClass('header--offset');
		}
	});

	const teamSlides = new Swiper('.team__slides', {
		slidesPerView: 1,
		spaceBetween: 24,
		loop: true,
		navigation: {
			nextEl: '.team .swiper-button-next',
			prevEl: '.team .swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			600: {
				slidesPerView: 2,
			},
			821: {
				slidesPerView: 3,
			},
		},
	});

	const reviewPhotoSlides = new Swiper('.reviews-photos', {
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.reviews-photo .swiper-button-next',
			prevEl: '.reviews-photo .swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	$('.reviews-photo .swiper-button-wrapper--mobile .swiper-button-prev').click(function () {
		reviewPhotoSlides.slidePrev();
	});
	$('.reviews-photo .swiper-button-wrapper--mobile .swiper-button-next').click(function () {
		reviewPhotoSlides.slideNext();
	});

	const reviewUsersSlides = new Swiper('.reviews-users__slides', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 10,
		navigation: {
			nextEl: '.reviews-users__slides-wrap .swiper-button-next',
			prevEl: '.reviews-users__slides-wrap .swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	$('.reviews-users .swiper-button-wrapper--mobile .swiper-button-prev').click(function () {
		reviewUsersSlides.slidePrev();
	});
	$('.reviews-users .swiper-button-wrapper--mobile .swiper-button-next').click(function () {
		reviewUsersSlides.slideNext();
	});

	const workExampleSlides = new Swiper('.work-example__slides', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 10,
		navigation: {
			nextEl: '.work-example__slides-wrap .swiper-button-next',
			prevEl: '.work-example__slides-wrap .swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	$('.work-example .swiper-button-wrapper--mobile .swiper-button-prev').click(function () {
		workExampleSlides.slidePrev();
	});
	$('.work-example .swiper-button-wrapper--mobile .swiper-button-next').click(function () {
		workExampleSlides.slideNext();
	});

	// standards tabs
	const standardsTabsCount = $('.standards__tabs li').length;
	$('.standards__tabs').css('--count', standardsTabsCount);

	const standardsSlides = new Swiper('.standards__slides', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 10,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			821: {
				allowTouchMove: false,
			},
		},
	});

	$('.standards__tabs li').click(function () {
		if (!$(this).hasClass('active')) {
			$('.standards__tabs li').removeClass('active');
			$(this).addClass('active');
		}
		standardsSlides.slideTo($(this).attr('slide'));
	});
	standardsSlides.on('beforeTransitionStart', function () {
		$('.standards__tabs li').removeClass('active');
		$(`.standards__tabs li[slide="${standardsSlides.activeIndex}"]`).addClass('active');
	});

	$('.faq-item .faq-top').click(function () {
		if (!$(this).parent().hasClass('open')) {
			$('.faq-item').removeClass('open');
			$('.faq-content').slideUp(200);

			$(this).parent().addClass('open');
			$(this).next().slideDown(200);
		} else {
			$('.faq-item').removeClass('open');
			$('.faq-content').slideUp(200);
		}
	});

	const certificatesSlides = new Swiper('.certificates__slides', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 24,
		navigation: {
			nextEl: '.certificates__slider .swiper-button-next',
			prevEl: '.certificates__slider .swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			600: {
				slidesPerView: 2,
			},
			821: {
				slidesPerView: 3,
			},
		},
	});

	$('.certificates .swiper-button-wrapper--mobile .swiper-button-prev').click(function () {
		certificatesSlides.slidePrev();
	});
	$('.certificates .swiper-button-wrapper--mobile .swiper-button-next').click(function () {
		certificatesSlides.slideNext();
	});

	$('.filter').click(function () {
		$(this).toggleClass('open');
	});

	$('.filter li').click(function () {
		$('.filter__title input').val($(this).attr('value'));
	});
});
