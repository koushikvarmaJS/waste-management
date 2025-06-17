const ip = "10.104.10.221"
const url = `http://${ip}:3000`

//console.log(url)

const getTransactionAmountByCategory = async (
  user,
  startTime,
  endTime,
) => {
  return fetch(
    `${url}/api/pieChart/getTransactionAmountByCategory?donar=${user}&startTime=${startTime}&endTime=${endTime}`
  )
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Network response was not ok for TransactionsCategory: ${errorText}`)
      }
      try {
        const data = await response.json()
        return data
      } catch (error) {
        const errorText = await response.text()
        throw new Error(`Failed to parse JSON: ${errorText}`)
      }
    })
    .catch((error) => console.error('error loading data for piechart', error))
}

const getBalance = (donar) => {
  return fetch(`${url}/api/rewards?donar=${donar}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for getbalance');
      }
      return response.json();
    })
    .then((data) => {
      console.log('fetched data for rewards', data);
      return data[0].rewards
    })
    .catch((error) => {
      console.error('error loading data for rewards', error);
      throw error;
    });
};

const getRecentTransactions = (user) => {
  return fetch(`${url}/api/recents?donar=${user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for recents');
      }
      return response.json();
    })
    .then((data) => {
      // console.log('fetched data', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data for recents', error);
      throw error;
    });
};

const getAllDonations = (user) => {
  return fetch(`${url}/api/allDonations?donar=${user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for all donations');
      }
      return response.json();
    })
    .then((data) => {
      // console.log('fetched data', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data for all donations', error);
      throw error;
    });
};

const getDonations = (donar) => {
  return fetch(`${url}/api/donations?donar=${donar}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for donations');
      }
      return response.json();
    })
    .then((data) => {
      // console.log('fetched data', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data for donations', error);
      throw error;
    });
};

const getUserDetails = (user) => {
  return fetch(`${url}/api/donar?donarId=${user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for userdetails');
      }
      return response.json();
    })
    .then((data) => {
      // console.log('fetched user data', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data for user details', error);
      throw error;
    });
};

const checkUserDetails = (user, password) => {
  // console.log("I am here");
  return fetch(`${url}/api/donar/check?userInput=${user}&passwordHash=${password}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok for userdetails');
      }
      return response.json();
    })
    .then((data) => {
      // console.log('fetched user data', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data to check user details', error);
      throw error;
    });
};

const addExpense = (newItem) => {
  return fetch(`${url}/api/donation`,{
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  })
    .then((response) => {
      console.log(response.status,response)
      if (!response.ok) {
        throw new Error('Network response was not ok to add expense');
      }
      return response.json();
    })
    .then((data) => {
      console.log('fetched data', data);
      return data.updatedBalance.Attributes
    })
    .catch((error) => {
      console.error('error loading data adding expense', error);
      throw error;
    });
};


const updateUserDetails = (updateUser) => {
  const donar = updateUser.donarId
  return fetch(`${url}/api/donar/update?donarId=${donar}`,{
    method: 'PUT',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(updateUser)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to update user details');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Updated user', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data updating user details', error);
      throw error;
    });
};

const updateStatus = (donation) => {
  return fetch(`${url}/api/status`,{
    method: 'PUT',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(donation)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to update status');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Updated user', data);
      return data;
    })
    .catch((error) => {
      console.error('error loading data updating status', error);
      throw error;
    });
};

const createUser = (newUser) => {
  return fetch(`${url}/api/newdonar`,{
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to create user');
      }
      return response.json();
    })
    .then((data) => {
      console.log('fetched data', data);
      return data
    })
    .catch((error) => {
      console.error('error loading data creating user', error);
      throw error;
    });
};

const deleteUser = (donar) => {
  return fetch(`${url}/api/donar/delete?donarId=${donar}`,{
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to delete user');
      }
      return response.json();
    })
    .then((data) => {
      console.log('message', data);
      return data
    })
    .catch((error) => {
      console.error('error loading data deleting user', error);
      throw error;
    });
};

const deleteExpense = (donation) => {
  return fetch(`${url}/api/deleteDonation`,{
    method: 'DELETE',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(donation)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok to delete expense');
      }
      return response.json();
    })
    .then((data) => {
      console.log('message', data);
      return data.Attributes;
    })
    .catch((error) => {
      console.error('error loading data deleting expense', error);
      throw error;
    });
};



module.exports = {
  getTransactionAmountByCategory,
  getBalance,
  getRecentTransactions,
  addExpense,
  deleteExpense,
  createUser,
  getUserDetails,
  checkUserDetails,
  updateUserDetails,
  deleteUser,
  getDonations,
  updateStatus,
  getAllDonations
}
