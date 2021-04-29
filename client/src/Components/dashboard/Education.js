import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  //education es pasado como prop, osea casi como un param desde el padre
  const educations = education.map((exp) => (
    <tr key={exp._id}>
      <td className='hide-sm'>{exp.school}</td>
      <td className='hide-sm'>{exp.degree}</td>
      <td className='hide-sm'>{exp.fieldofstudy}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'> {exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'> {exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(exp._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Schools Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Field of study</th>

            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
