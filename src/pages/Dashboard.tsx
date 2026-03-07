import { useAuth } from '../hooks/useAuth'

export const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className='p-8 max-w-4xl mx-auto space-y-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>

      <div className='card bg-base-100 shadow-xl border'>
        <div className='card-body'>
          <h2 className='card-title'>Welcome back, {user?.name}!</h2>
          <p className='text-base-content/70'>
            This is a protected route. You can only see this page if you have a valid JWT access
            token.
          </p>

          <div className='divider'></div>

          <div className='overflow-x-auto'>
            <table className='table'>
              <tbody>
                <tr>
                  <th className='w-1/3'>ID</th>
                  <td className='font-mono'>{user?.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{user?.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <th>Account Created</th>
                  <td>{user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
