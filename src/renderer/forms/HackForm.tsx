import HealthCpnt from '../components/forms/Health/Health'
import AmmoCpnt from '../components/forms/Ammo/Ammo'
import VaultItemCpnt from '../components/forms/VaultItem/VaultItem'

import { Grid } from '@mui/material';

export default function HackForm() {

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <HealthCpnt />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AmmoCpnt />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <VaultItemCpnt vault={1}/>
        </Grid>
      </Grid>
    </div>

    // <Form>
    //   <Row>
    //     <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
    //       <Form.Label>Health</Form.Label>
    //       <input type="range"></input>
    //       <RangeSlider
    //         value={1}
    //         max={1200}
    //         size="lg"
    //       />
    //       {/* <Form.Control type="email" placeholder="Enter email" /> */}
    //       <Form.Check
    //         type="checkbox"
    //         id="disabledFieldsetCheck"
    //         label="Can't check this"
    //         className="mt-2"
    //       />
    //     </Form.Group>

    //     <Form.Group className="mb-3 col-6" controlId="formBasicPassword">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control type="password" placeholder="Password" />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //       <Form.Check type="checkbox" label="Check me out" />
    //     </Form.Group>
    //   </Row>
    //   <Button variant="primary" type="submit">
    //     Submit
    //   </Button>
    // </Form>
  )
}
