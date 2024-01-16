import Image from 'next/image';
import Style from "../tour-detail.module.css";

export default function TourPictures({ tour }) {
    return (
        <section className={`${Style["section-pictures"]}`}>
            {tour.images.map((img, index) => (
                <div key={index} className={`${Style["pictures-box"]}`}>
                    <Image className={`${Style[`pictures-box__img--${index + 1}`]}`} src={`/img/tours/${img}`} priority width={600} height={600} alt={`${tour.name} ${index + 1}`} />
                </div>
            ))}
        </section>
    )
}
