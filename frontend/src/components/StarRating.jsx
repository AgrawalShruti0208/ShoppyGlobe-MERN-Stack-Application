// Helper component
export function StarRating(props){

        let n = props.ProductRating;

        let a = (n+"").split("");

        let stars = 0;
        if(a.length == 1){
            for(let i = 1;i<=a[0];i++){
                stars++;
            }
        }else{
            let b = a[2]
            let c;

            if(b<=5){
                c = (5-b < 3)?5:0;
            }else{
                c = (b-5 >=3)?10:5;
            }
        
            for(let i = 1;i<=a[0];i++){
                stars++;
            }

            if(c !=0){
                stars = (c==5)?stars+0.5:stars+1;
            }

        }

        

        // For displaying stars for rating
        const starImages = [];

        const ratingStar={
            full:"/full_star.png",
            half:"/half_star.png"
        }

        const split = (stars+"").split("");
        let i =1;
        for(i = 1;i<=split[0];i++){
            starImages.push(<img key={i} src={ratingStar.full} height={props.starHeight}/>)
        }
        if(split.length>1){
            starImages.push(<img key={i+1} src={ratingStar.half} height={props.starHeight}/>)
        }
        
       
    
    return(
        <div className="RatingStars">
            <h3>{n}</h3>  
            <span className="Stars">{starImages}</span>
        </div>
    )
}