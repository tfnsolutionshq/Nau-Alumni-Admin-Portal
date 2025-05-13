import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const UserDetailsPage = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  // Sample user data - in a real app, you would fetch this based on userId
  const [userData, setUserData] = useState({
    firstName: "Uche",
    lastName: "ThankGod",
    email: "tuche@gmail.com",
    phone: "07069790950",
    role: "Chapter Lead",
    permissions: ["Member", "Galleria", "Event/News"],
  })

  const handleGoBack = () => {
    navigate(-1)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, you would save the changes to the backend here
    setIsEditing(false)
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      <div className="w-full px-6 py-4 mx-auto">
        {/* Header */}
        <div className="pb-4 border-b flex justify-between items-center">
          <button className="flex items-center p-1 rounded shadow text-gray-600" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          {isEditing ? (
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>
              Save
            </button>
          ) : null}
        </div>

        {/* User Information */}
        <div className="p-4 rounded border mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">User Information</h2>
            {!isEditing && (
              <button
                className="text-gray-600 text-sm px-4 py-1 border border-gray-300 rounded-md"
                onClick={toggleEdit}
              >
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-1">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              ) : (
                <p>{userData.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              ) : (
                <p>{userData.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              ) : (
                <p>{userData.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Role</label>
              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              ) : (
                <p>{userData.role}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Permissions</label>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {["Member", "Member Chamber", "Galleria", "Event/News", "Suggestion box"].map((permission) => (
                    <label key={permission} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={userData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserData((prev) => ({
                              ...prev,
                              permissions: [...prev.permissions, permission],
                            }))
                          } else {
                            setUserData((prev) => ({
                              ...prev,
                              permissions: prev.permissions.filter((p) => p !== permission),
                            }))
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p>{userData.permissions.join(", ")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default UserDetailsPage
