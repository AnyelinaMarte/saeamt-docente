 export default function ProgresoBarra(props) {
    console.log(props.calificacion)
    return (
      <div>
        <style>{`
            .progress-bar::before{
            width:${props.calificacion}%;
            }
            
        `}</style>
        <span>{props.calificacion}% de 100%</span>
        <div className="progress-bar"></div>
      </div>
    );  
  }