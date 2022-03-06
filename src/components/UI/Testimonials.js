import classes from './Testimonials.module.css';
import imagePius from '../images/Pius.jpg';
import imageBibo from'../images/Bibo.jpeg';
import imageLucky from '../images/Lucky.jpg';
import imageJoskimsey from '../images/Joskimsey.jpg';


const person = [
    {key: 1, name: 'Ian Pius', work: 'Disk Jockey', image: imagePius, testimony: 'With this website I am able to reach more comrades for planned parties and entertain them with good music! A great Web indeed!'},
    {key: 2, name: 'Bibo Boom', work: 'Graphic Designer', image: imageBibo, testimony: 'Many fellow comrades appreciate my work and were not for Pius and Joskimsey, my market wouldn\'t be as wide as it is now!'},
    {key: 3, name: 'Lucky Law', work: 'Business Enthusiasist', image: imageLucky, testimony: 'Now many comrades can invest in small projects thanks to me. I can now reach many people through here and it is all thanks to Pius'},
    {key: 4, name: 'Joskimsey', work: 'Marketer', image: imageJoskimsey, testimony: 'I feel like now I can reach the world through this online store. My clients are now happier than ever and besides, I am getting more clients'},
    {key: 5, name: 'Ian Pius', work: 'Disk Jockey', image: imagePius, testimony: 'With this website I am able to reach more comrades for planned parties and entertain them with good music! A great Web indeed!'},
]

const Testimonials = () => {
    return(
        <section className={classes.contain}>
            <div className={classes.container}>
                <div className={classes.testimonials}>
                    <div className={classes.inside}>
                        {person.map(person => {
                            return(
                                <div key={person.key} className={classes.each}>
                                    <div className={classes.all}>
                                        <div className={classes.image}>
                                            <img src={person.image} alt=''></img>
                                        </div>
                                        <h1>{person.name}</h1>
                                        <h2>{person.work}</h2>
                                        <div className={classes.paragraph}>
                                            <p>{person.testimony}</p>
                                        </div>
                                    </div>
                                </div>  
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;