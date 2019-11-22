import React from 'react'

const ProgressBar = ({progress, label, color}) => {
  const prg = progress!=undefined ? progress : 0
  const col = color != undefined ? color : (progress == 100 ? '#00e64d' : '#ffcc00')

  return (
    <div>
      <div className="bars" style={{ marginTop: "8px" }}>
        <div className="progress-xs  mb-0 progress-gray progress">
          <div className={"progress-bar bg-"+col}
               style={{ width: prg+"%", backgroundColor: col }}
               role="progressbar"
               aria-valuenow={prg.toString()}
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
      </div>
      {label!=undefined &&
        <div style={{ marginTop: "5px" }}>
          <i>
            {label}
          </i>
        </div>
      }
    </div>
  )
}

export default ProgressBar