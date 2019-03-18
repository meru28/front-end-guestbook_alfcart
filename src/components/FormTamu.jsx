import React, { Component } from "react";
import { Button, UncontrolledAlert } from "reactstrap";
import { HashLoader } from "react-spinners";
import { connect } from "react-redux";
import "../support/css/main.css";
import "../support/css/util.css";
import { tambahTamu } from "../actions";

class FormTamu extends Component {
  state = {
    nama: "",
    genderSelect: "",
    email: "",
    alamat: "",
    pesan: ""
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeSelect = event => {
    this.setState({ genderSelect: event.target.value });
  };

  handleAddSubmit = event => {
    event.preventDefault();
    var { nama, genderSelect, email, alamat, pesan } = this.state;
    console.log(`
  -- SUBMITTING --
  ${nama}
  ${genderSelect}
  ${email}
  ${alamat}
  ${pesan}`);
    this.props.tambahTamu({ nama, genderSelect, email, alamat, pesan });
    // window.location.reload(true);
  };

  renderError = () => {
    if (this.props.error.length > 0) {
      return <p style={{ color: "red" }}>{this.props.error}</p>;
    }
  };

  renderButton = () => {
    if (this.props.loading) {
      return (
        <center>
          <HashLoader sizeUnit={"px"} size={35} color={"#7ce316"} />
        </center>
      );
    }
    return (
      <div className="container-login100-form-btn">
        <Button color="success" type="submit">
          Oke
        </Button>
      </div>
    );
  };

  renderAlert = () => {
    if (this.props.status.length > 0) {
      return (
        <UncontrolledAlert color="success">
          {this.props.status}
        </UncontrolledAlert>
      );
    }
  };

  render() {
    console.log(this.props.status);
    return (
      <div className="limiter">
        {this.renderAlert()}
        <div className="container-login100">
          <div className="wrap-login100">
            <div
              className="login100-form-title"
              style={{ backgroundImage: "url(images/bg-01.png)" }}
            >
              <span className="login100-form-title-1">Buku Tamu</span>
            </div>
            <center style={{ marginTop: "30px" }}>
              <h6>
                Silahkan isi buku tamu di bawah ini untuk meninggalkan pesan
                Anda.
              </h6>
            </center>
            <form
              className="login100-form validate-form"
              onSubmit={this.handleAddSubmit}
            >
              <div className="wrap-input100 validate-input m-b-26">
                <span className="label-input100">Nama Lengkap</span>
                <input
                  className="input100"
                  type="text"
                  name="nama"
                  placeholder="Isi Nama Anda"
                  // required
                  onChange={this.handleChange}
                />
                <span className="focus-input100" />
              </div>
              <div className="validate-input m-b-18">
                <span className="label-input100">Jenis Kelamin</span>
                <select
                  value={this.state.genderSelect}
                  onChange={this.handleChangeSelect}
                >
                  <option value="selected">Pilih jenis kelamin</option>
                  <option>Laki - laki</option>
                  <option>Perempuan</option>
                </select>
                <span className="focus-input100" />
              </div>
              <div className="wrap-input100 validate-input m-b-18">
                <span className="label-input100">Email</span>
                <input
                  className="input100"
                  type="email"
                  name="email"
                  placeholder="Isi Email Anda"
                  onChange={this.handleChange}
                />
                <span className="focus-input100" />
              </div>
              <div className="wrap-input100 validate-input m-b-18">
                <span className="label-input100">Alamat</span>
                <input
                  className="input100"
                  type="text"
                  name="alamat"
                  placeholder="Isi Alamat Anda"
                  // required
                  onChange={this.handleChange}
                />
                <span className="focus-input100" />
              </div>
              <div className="wrap-input100 validate-input m-b-18">
                <span className="label-input100">Pesan</span>
                <textarea
                  className="input100"
                  type="text-area"
                  name="pesan"
                  placeholder="Isi Pesan Anda"
                  onChange={this.handleChange}
                />
                <span className="focus-input100" />
              </div>
              {this.renderError()}
              {this.renderButton()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loading, error, status } = state.tamu;
  return { loading, error, status };
};

export default connect(
  mapStateToProps,
  { tambahTamu }
)(FormTamu);
