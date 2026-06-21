import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Home from './screens/Home.jsx'
import Path from './screens/Path.jsx'
import Lessons from './screens/Lessons.jsx'
import LessonDetail from './screens/LessonDetail.jsx'
import People from './screens/People.jsx'
import FamilyName from './screens/FamilyName.jsx'
import TemplePrep from './screens/TemplePrep.jsx'
import RecommendReadiness from './screens/RecommendReadiness.jsx'
import CheckIn from './screens/CheckIn.jsx'
import Settings from './screens/Settings.jsx'
import Activities from './screens/Activities.jsx'
import Journal from './screens/Journal.jsx'

export default function App() {
  return (
    <div className="app">
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/path" element={<Path />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/people" element={<People />} />
          <Route path="/family" element={<FamilyName />} />
          <Route path="/temple" element={<TemplePrep />} />
          <Route path="/recommend" element={<RecommendReadiness />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
