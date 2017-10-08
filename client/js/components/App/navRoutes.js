import Strings from '../../Strings';

export default [
    {
        title: Strings.dashboard,
        icon: "tachometer",
        route: "/"
    },
    {
        title: Strings.agenda,
        icon: "list-alt",
        route: "/agenda"
    },
    {
        title: Strings.timetable,
        icon: "calendar",
        requireSession: true,
        route: "/timetable"
    }
]