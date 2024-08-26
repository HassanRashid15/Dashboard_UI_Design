import React from 'react'
import { Link } from 'react-router-dom'

function DashboardBreadcrumbs({ pageTitle, paths }) {
  return (
    <div className="breadcrumb-container">
      <h2 className="breadcrumb-title">{pageTitle}</h2>
      <nav className="breadcrumb-paths">
        {paths.map((path, index) => (
          <span key={index}>
            {index > 0 && ' / '}
            {path.link ? (
              <Link to={path.link} className="breadcrumb-link">
                {path.name}
              </Link>
            ) : (
              <span>{path.name}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  )
}

export default DashboardBreadcrumbs