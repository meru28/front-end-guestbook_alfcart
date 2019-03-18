import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

class ModalEditTamu extends Component {
  state = {
    modalEdit: false,
    nama: this.props.modalData.nama_tamu,
    jenis_kelamin: this.props.modalData.jenis_kelamin,
    email: this.props.modalData.email,
    alamat: this.props.modalData.alamat,
    pesan: this.props.modalData.pesan,
    jenis_kel_changes: ""
  };

  toggle = () => this.setState({ modalEdit: !this.state.modalEdit });

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeSelect = event => {
    this.setState({ jenis_kel_changes: event.target.value });
  };

  onSubmit = (
    id_tamu,
    nama_update,
    jenis_kel_changes,
    email_update,
    alamat_update,
    pesan_update
  ) => {
    axios
      .put("http://localhost:1990/api/guest/" + id_tamu, {
        nama_update,
        jenis_kel_changes,
        email_update,
        alamat_update,
        pesan_update
      })
      .then(res => {
        this.setState({ modalEdit: !this.state.modalEdit });
        window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { nama, jenis_kel_changes, email, alamat, pesan } = this.state;
    const { id_tamu } = this.props.modalData;

    return (
      <div>
        <Button outline color="primary" size="sm" onClick={this.toggle}>
          <FiEdit />
        </Button>
        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <span style={{ textAlign: "center" }}>
              <h2>Edit Tamu</h2>
              <br />
            </span>
            {this.props.modalData.nama_tamu} - id: {id_tamu}
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Nama</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder={"default: " + this.props.modalData.nama_tamu}
                  value={nama}
                  name="nama"
                  onChange={this.handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Jenis Kelamin</InputGroupText>
                </InputGroupAddon>
                <select
                  value={this.state.jenis_kel_changes}
                  onChange={this.handleChangeSelect}
                >
                  <option value="selected">Pilih Jenis Kelamin</option>
                  <option>Laki - laki</option>
                  <option>Perempuan</option>
                </select>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Email</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder={"default: " + this.props.modalData.email}
                  value={email}
                  name="email"
                  onChange={this.handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Alamat</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder={"default: " + this.props.modalData.alamat}
                  value={alamat}
                  name="alamat"
                  onChange={this.handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Pesan</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="textarea"
                  placeholder={"default: " + this.props.modalData.pesan}
                  value={pesan}
                  name="pesan"
                  onChange={this.handleChange}
                />
              </InputGroup>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() =>
                this.onSubmit(
                  id_tamu,
                  nama,
                  jenis_kel_changes,
                  email,
                  alamat,
                  pesan
                )
              }
            >
              Yakin Edit?
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Batal
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalEditTamu;
