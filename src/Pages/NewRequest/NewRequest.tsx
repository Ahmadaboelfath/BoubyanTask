import * as React from "react";
import INewRequestProps from "./INewRequestProps";
import INewRequestState from "./INewRequestState";
import { RouteComponentProps } from "react-router-dom";
import styles from "./NewRequests.module.scss";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  TextField,
} from "office-ui-fabric-react";
import RequestService from "../../Service/RequestService";

export default class NewRequest extends React.Component<
  RouteComponentProps<INewRequestProps>,
  INewRequestState
> {
  private readonly _requestService: RequestService;

  constructor(props) {
    super(props);
    this._requestService = new RequestService();
    this.state = {
      request: {
        branch: "",
        customerCIF: "",
        customerName: "",
        details: "",
        lastAction: "",
        lastActionBy: "",
        lastActionDate: null,
        status: "Pending",
      },
      errors: {
        customerCIF: "",
        customerName: "",
        branch: "",
        details: "",
      },
      showConfirmDialog: false,
      showSubmitDialog: false,
      showErrorDialog: false,
      showSpinner: false,
    };
  }

  onChange(value, propName) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const request = { ...prevState.request };
      request[propName] = value;
      newState.request = request;
      return newState;
    });
  }

  validateForm(): { isValid: boolean; errors } {
    let isValid: boolean = true;
    let errors = {};
    Object.keys(this.state.errors).forEach((key) => {
      if (!this.state.request[key].trim()) {
        errors[key] = "Required";
        isValid = false;
      } else {
        errors[key] = "";
      }
    });

    return { isValid: isValid, errors: errors };
  }

  onSubmit() {
    const formValidation = this.validateForm();
    if (formValidation.isValid) {
      this.setState({ showSubmitDialog: true, errors: formValidation.errors });
    } else {
      this.setState({ errors: formValidation.errors });
    }
  }

  submitRequest() {
    this.setState({ showSpinner: true });
    this._requestService
      .addRequest(this.state.request)
      .then((value) => {
        this.setState((prevState: INewRequestState) => {
          const newState = { ...prevState };
          newState.showSubmitDialog = false;
          newState.showConfirmDialog = true;
          newState.showSpinner = false;
          return newState;
        });
      })
      .catch((e) => {
        this.setState((prevState: INewRequestState) => {
          const newState = { ...prevState };
          newState.showSubmitDialog = false;
          newState.showConfirmDialog = false;
          newState.showErrorDialog = true;
          newState.showSpinner = false;
          return newState;
        });
      });
  }

  render(): JSX.Element {
    return (
      <div>
        {this.state.showSpinner ? (
          <Spinner size={SpinnerSize.large} />
        ) : (
          <div>
            <div className={styles["three-row-container"]}>
              <TextField
                label="Customer CIF"
                required
                errorMessage={this.state.errors.customerCIF}
                value={this.state.request.customerCIF}
                onChanged={(newValue) => this.onChange(newValue, "customerCIF")}
                className={styles.control}
              />
              <TextField
                label="Customer Name"
                required
                errorMessage={this.state.errors.customerName}
                value={this.state.request.customerName}
                onChanged={(newValue) =>
                  this.onChange(newValue, "customerName")
                }
                className={styles.control}
              />
              <TextField
                label="Branch"
                required
                errorMessage={this.state.errors.branch}
                value={this.state.request.branch}
                onChanged={(newValue) => this.onChange(newValue, "branch")}
                className={styles.control}
              />
            </div>
            <div className={styles["one-row-container"]}>
              <TextField
                label="Details"
                rows={6}
                required
                errorMessage={this.state.errors.details}
                value={this.state.request.details}
                onChanged={(newValue) => this.onChange(newValue, "details")}
                multiline
              />
            </div>
            <div className={styles["btn-holder"]}>
              <PrimaryButton
                style={{ backgroundColor: "#ff3c00", padding: "18px" }}
                className={styles.btn}
                onClick={() => this.onSubmit()}
              >
                Submit
              </PrimaryButton>
              <PrimaryButton
                style={{ backgroundColor: "#ff3c00", padding: "18px" }}
                className={styles.btn}
                onClick={() => this.props.history.push("/")}
              >
                Cancel
              </PrimaryButton>

              <Dialog
                hidden={!this.state.showSubmitDialog}
                onDismiss={() => this.setState({ showSubmitDialog: false })}
              >
                <DialogContent>
                  Are You Sure You Want To Submit Request
                </DialogContent>
                <DialogFooter>
                  <PrimaryButton
                    style={{ backgroundColor: "#ff3c00", padding: "18px" }}
                    onClick={() => this.submitRequest()}
                  >
                    Confirm
                  </PrimaryButton>
                  <PrimaryButton
                    style={{ backgroundColor: "#ff3c00", padding: "18px" }}
                    onClick={() => this.setState({ showSubmitDialog: false })}
                  >
                    Cancel
                  </PrimaryButton>
                </DialogFooter>
              </Dialog>
              <Dialog hidden={!this.state.showConfirmDialog}>
                <DialogContent>Submitted Successfully !!!</DialogContent>
                <DialogFooter>
                  <PrimaryButton
                    style={{ backgroundColor: "#ff3c00", padding: "18px" }}
                    onClick={() => this.props.history.push("/")}
                  >
                    Confirm
                  </PrimaryButton>
                </DialogFooter>
              </Dialog>
              <Dialog
                hidden={!this.state.showErrorDialog}
                onDismiss={() => this.setState({ showErrorDialog: false })}
              >
                <DialogContent>
                  An Error Occurred please try again if error persisit please
                  contact your administrator
                </DialogContent>
                <DialogFooter>
                  <PrimaryButton
                    style={{ backgroundColor: "#ff3c00", padding: "18px" }}
                    onClick={() => this.setState({ showErrorDialog: false })}
                  >
                    Confirm
                  </PrimaryButton>
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    );
  }
}
