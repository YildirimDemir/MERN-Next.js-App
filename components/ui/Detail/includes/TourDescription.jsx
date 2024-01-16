import Image from 'next/image';
import Style from "../tour-detail.module.css";

export default function TourDescription({ tour }) {

    const date = new Date(tour?.startDates[0]);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long'
    })?.format(date);

    return (
        <section className={`${Style["section-description"]}`}>
            <div className={`${Style["overview-box"]}`}>
                <div className={`${Style["overview-box__group"]}`}>
                    <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-lg"]}`}>Quick facts</h2>
                    <div className={`${Style["overview-box__detail"]}`}>
                        <svg className={`${Style["overview-box__icon"]}`}>
                            <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                        </svg>
                        <span className={`${Style["overview-box__label"]}`}>Next date</span>
                        <span className={`${Style["overview-box__text"]}`}>{formattedDate}</span>
                    </div>
                    <div className={`${Style["overview-box__detail"]}`}>
                        <svg className={`${Style["overview-box__icon"]}`}>
                            <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                        </svg>
                        <span className={`${Style["overview-box__label"]}`}>Difficulty</span>
                        <span className={`${Style["overview-box__text"]}`}>{tour.difficulty}</span>
                    </div>
                    <div className={`${Style["overview-box__detail"]}`}>
                        <svg className={`${Style["overview-box__icon"]}`}>
                            <use xlinkHref="/img/icons.svg#icon-user"></use>
                        </svg>
                        <span className={`${Style["overview-box__label"]}`}>Participant</span>
                        <span className={`${Style["overview-box__text"]}`}>{tour.maxGroupSize} People</span>
                    </div>
                    <div className={`${Style["overview-box__detail"]}`}>
                        <svg className={`${Style["overview-box__icon"]}`}>
                            <use xlinkHref="/img/icons.svg#icon-star"></use>
                        </svg>
                        <span className={`${Style["overview-box__label"]}`}>Rating</span>
                        <span className={`${Style["overview-box__text"]}`}>{tour.ratingsAverage}/5</span>
                    </div>
                </div>
                <div className={`${Style["overview-box__group"]}`}>
                    <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-lg"]}`}>Your tour guides</h2>
                    {tour?.guides.map(guide => (
                        <div key={guide._id} className={`${Style["overview-box__detail"]}`}>
                            <Image className={`${Style["overview-box__img"]}`} src={`/img/users/${guide.photo}`} width={40} height={300} alt={guide.name} />
                            {guide.role === "lead-guide" &&
                                <span className={`${Style["overview-box__label"]}`}>Lead guide</span>}
                            {guide.role === "guide" &&
                                <span className={`${Style["overview-box__label"]}`}>Tour guide</span>}
                            <span className={`${Style["overview-box__text"]}`}>{guide.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${Style["description-box"]}`}>
                <h2 className={`${Style["heading-secondary"]} ${Style["ma-bt-lg"]}`}>About {tour.name} Tour</h2>
                {tour.description.split("\n").map((text, index) => (
                    <p key={index} className={`${Style["description__text"]}`}>{text}</p>
                ))}
            </div>
        </section>
    )
}
