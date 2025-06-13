import React from 'react'

const ModelPage = () => {
  return (
    
    <div className="w-full h-screen">
        <iframe
          src="http://localhost:8501/"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Grafana Dashboard"
          style={{ border: 'none' }}
        />
      </div>
      
  )
}

export default ModelPage
