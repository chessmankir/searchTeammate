export function Members(){
    return (
      <div className="member-container">
          <div className="member-name">Игроки</div>
          <div className="member-list">
              <table className="table table-striped projects">
                  <thead>
                  <tr>
                      <th >
                          #
                      </th>
                      <th>
                          Project Name
                      </th>
                      <th>
                          Team Members
                      </th>
                      <th>
                          Project Progress
                      </th>
                      <th>
                          Status
                      </th>
                      <th >
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>
                          #
                      </td>
                      <td>
                          <a>
                              AdminLTE v3
                          </a>
                          <br/>
                          <small>
                              Created 01.01.2019
                          </small>
                      </td>
                      <td>
                          <ul className="list-inline">
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="src/assets/ava.jpg"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="src/assets/ava.jpg"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="src/assets/ava.jpg"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="src/assets/ava.jpg"/>
                              </li>
                          </ul>
                      </td>
                      <td className="project_progress">
                          <div className="progress progress-sm">
                              <div className="progress-bar bg-green" role="progressbar" aria-valuenow="57"
                                   aria-valuemin="0" aria-valuemax="100" >
                              </div>
                          </div>
                          <small>
                              57% Complete
                          </small>
                      </td>
                      <td className="project-state">
                          <span className="badge badge-success">Success</span>
                      </td>
                      <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                              <i className="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                              <i className="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                              <i className="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          #
                      </td>
                      <td>
                          <a>
                              AdminLTE v3
                          </a>
                          <br/>
                          <small>
                              Created 01.01.2019
                          </small>
                      </td>
                      <td>
                          <ul className="list-inline">
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="src/assets/ava.jpg"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="src/assets/ava.jpg"/>
                              </li>
                          </ul>
                      </td>
                      <td className="project_progress">
                          <div className="progress progress-sm">
                              <div className="progress-bar bg-green" role="progressbar" aria-valuenow="47"
                                   aria-valuemin="0" aria-valuemax="100" >
                              </div>
                          </div>
                          <small>
                              47% Complete
                          </small>
                      </td>
                      <td className="project-state">
                          <span className="badge badge-success">Success</span>
                      </td>
                      <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                              <i className="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                              <i className="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                              <i className="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>

                  </tbody>
              </table>
          </div>
      </div>
    );
}