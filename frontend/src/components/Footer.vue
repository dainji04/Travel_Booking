<template>
    <footer class="footer">
        <div class="sign-up">
            <div class="sign-up__left">
                <h1 class="sign-up__title">Are you ready?</h1>
                <p class="sign-up__description">
                    It only takes a few minutes to sign up for a TRAVEL BOOKING
                    account.
                </p>
                <button class="sign-up__button button-primary">
                    Sign Up Now
                </button>
            </div>
            <div class="sign-up__right">
                <img
                    class="sign-up__image"
                    src="@/assets/images/footer-sign-up.png"
                    alt=""
                />
            </div>
        </div>
        <div class="main">
            <div class="main__left">
                <img src="@/assets/fonts/logo.svg" alt="Travel Booking Logo" />
            </div>

            <div class="main__middle">
                <h1 class="main__title">Travel Booking</h1>

                <div class="main__nav-grid">
                    <!-- Cột 1 -->
                    <div class="main__nav-column">
                        <router-link
                            :to="{ name: 'home' }"
                            class="main__nav-link"
                            >Home</router-link
                        >
                        <router-link
                            :to="{ name: 'tour' }"
                            class="main__nav-link"
                            >Tour</router-link
                        >
                    </div>

                    <!-- Cột 2 -->
                    <div class="main__nav-column">
                        <router-link
                            :to="{ name: 'about' }"
                            class="main__nav-link"
                            >About Us</router-link
                        >
                        <router-link
                            :to="{ name: 'blog' }"
                            class="main__nav-link"
                            >Blogs</router-link
                        >
                    </div>

                    <!-- Cột 3 -->
                    <div class="main__nav-column">
                        <router-link
                            :to="{ name: 'contact' }"
                            class="main__nav-link"
                            >Contact</router-link
                        >
                    </div>
                </div>

                <div class="main__social">
                    <a href="#" class="main__social-link">
                        <img
                            src="@/assets/fonts/social_facebook.svg"
                            alt="Facebook"
                            class="main__social-icon"
                        />
                    </a>
                    <a href="#" class="main__social-link">
                        <img
                            src="@/assets/fonts/social_instagram.svg"
                            alt="Twitter"
                            class="main__social-icon"
                        />
                    </a>
                    <a href="#" class="main__social-link">
                        <img
                            src="@/assets/fonts/social_pinterest.svg"
                            alt="Instagram"
                            class="main__social-icon"
                        />
                    </a>
                    <a href="#" class="main__social-link">
                        <img
                            src="@/assets/fonts/social_youtube.svg"
                            alt="YouTube"
                            class="main__social-icon"
                        />
                    </a>
                </div>
            </div>

            <div class="main__right">
                <h1 class="main__right-title">
                    Sign up to receive the latest news.
                </h1>
                <input
                    type="text"
                    placeholder="email or phone number"
                    class="main__input"
                />
                <button class="button-primary main__button">Sign Up Now</button>
            </div>
        </div>
        <div class="copyright">
            <span class="copyright__line"></span>
            <div class="copyright__left">
                <img src="@/assets/fonts/copyright.svg" alt="" />
                <p>
                    Design and programming by
                    <span style="color: #f37916">Eight Bros</span>
                </p>
            </div>
            <div class="copyright__right">
                <p>
                    Term <span class="copyright__line-stand"></span> Conditions
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@use '@/assets/scss/footer.scss';
</style>
