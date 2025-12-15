const wrapper = (title, body) => `
  <div style="font-family:Arial; background:#f4f6f8; padding:30px">
    <div style="max-width:600px;margin:auto;background:#fff;
      border-radius:10px; padding:30px; box-shadow:0 10px 30px rgba(0,0,0,.1)">
      
      <h2 style="color:#009688">${title}</h2>
      <hr style="border:none;border-top:1px solid #eee;margin:15px 0"/>
      ${body}
      <br/>
      <p style="font-size:13px;color:#888">— Workshop Management System</p>
    </div>
  </div>
`;

export const studentApprovalTemplate = (name, status) =>
  wrapper(
    `Student ${status === "approved" ? "Approved ✅" : "Rejected ❌"}`,
    `
      <p>Hello <b>${name}</b>,</p>
      <p>Your registration request at <b></b> has been
      <b style="color:${status === "approved" ? "green" : "red"}">
      ${status.toUpperCase()}</b>.</p>

      ${
        status === "approved"
          ? `<p>You can now log in and register for workshops.</p>`
          : `<p>Please contact the university for further guidance.</p>`
      }
    `
  );

export const universityApprovalTemplate = (university, status) =>
  wrapper(
    `University ${status === "approved" ? "Approved 🎉" : "Rejected ❌"}`,
    `
      <p>Hello <b>${university}</b>,</p>
      <p>Your university account has been
      <b style="color:${status === "approved" ? "green" : "red"}">
      ${status.toUpperCase()}</b> by Admin.</p>

      ${
        status === "approved"
          ? `<p>You can now create workshops and manage students.</p>`
          : `<p>Access to the platform is restricted.</p>`
      }
    `
  );
