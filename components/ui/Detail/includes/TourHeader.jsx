import Image from 'next/image'
import Style from "../tour-detail.module.css";

export default function TourHeader({ tour }) {

    return (
        <section className={`${Style["section-header"]}`}>
            <div className={`${Style["header__hero"]}`}>
                <div className={`${Style["header__hero-overlay"]}`}>&nbsp;</div>
                <Image className={`${Style["header__hero-img"]}`} src={`/img/tours/${tour?.imageCover}`} priority width={1000} height={1000} alt={tour.name} />
            </div>
            <div className={`${Style["heading-box"]}`}>
                <h1 className={`${Style["heading-primary"]}`}>
                    <span>{tour?.name}</span>
                </h1>
                <div className={`${Style["heading-box__group"]}`}>
                    <div className={`${Style["heading-box__detail"]}`}>
                        <svg className={`${Style["heading-box__icon"]}`}>
                            <use xlinkHref="/img/icons.svg#icon-clock"></use>
                        </svg>
                        <span className={`${Style["heading-box__text"]}`}>{tour?.duration} days</span>
                    </div>
                    <div className={`${Style["heading-box__detail"]}`}>
                        <svg className={`${Style["heading-box__icon"]}`}>
                            <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                        </svg>
                        <span className={`${Style["heading-box__text"]}`}>{tour?.startLocation.description}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
