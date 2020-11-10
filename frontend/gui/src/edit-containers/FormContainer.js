import React, {lazy} from 'react'
import {connect} from 'react-redux'
import {
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {okForm, cancelForm} from '../redux/actions/Form'


const ENABLE_EVENT_FORM = 'ENABLE_EVENT_FORM'

const EventForm = lazy(()=>import('../components/forms/EventForm.js'))

const FormContainer = ({formType, isFetchingFormContent, okForm, cancelForm}) => {
  
  let form=formSelection(formType);
  if (form===null) return null;

  return(
    <>
      <CCard className="card-form">
        <CCardHeader>
          {form.title}
        </CCardHeader>
        <CCardBody>
          {isFetchingFormContent?
          <div>
            <CRow>
              <CCol xs="12" md="12">
                <h4>Cargando...</h4>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="12">
                <CIcon size= "xl" name="cil-cloud-download" />
              </CCol>
            </CRow>
          </div>:
          <div>
            <form.content/>
          </div>}
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol xs="12" md="6">
              <CButton type="reset" size="sm" color="danger" onClick={()=> cancelForm()}><CIcon name="cil-ban" /> Cancelar</CButton>
            </CCol>
            <CCol xs="12" md="6">
              <CButton type="submit" size="sm" color="primary" onClick={()=> okForm()}> Ok</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )

}

const mapStateToProps = (state) => {
  return{
    formType: state.form.formType,
    isFetchingFormContent: state.form.isFetching
  };
}

const mapDispatchToProps = (dispatch) => {
  return{
    okForm: () => dispatch(okForm()),
    cancelForm: () => dispatch(cancelForm()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FormContainer)

const formSelection = (formType) => {

  if(formType===null) return null;

  const forms = {
    ENABLE_EVENT_FORM: {title:'Editar Eventos',content:EventForm},
  };

  return forms[formType];

}