import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
const useStyles = makeStyles(
  theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      background: theme.palette.common.grey,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    iconButtonInvisible: {
      visibility: 'hidden',
    },
  }),
  { name: 'searchField' }
)
/**
 * Search input field based on `@material-ui`.
 *
 * @component
 */
const SearchField = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  'aria-label': ariaLabel,
  className,
  ...props
}) => {
  const classes = useStyles()
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(e)
  }
  const handleChange = e => {
    onChange(e)
  }
  const handleClear = () => {
    onChange({ target: { value: '' } })
  }
  return (
    <Paper className={classes.root} {...props}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        inputProps={{ 'aria-label': ariaLabel }}
      />
      <IconButton
        type="button"
        className={[
          classes.iconButton,
          !value && classes.iconButtonInvisible,
        ].join(' ')}
        onClick={handleClear}
        aria-label="clear"
      >
        <ClearIcon />
      </IconButton>
      {onSubmit && (
        <IconButton
          type="submit"
          className={classes.iconButton}
          onClick={handleSubmit}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      )}
    </Paper>
  )
}
SearchField.defaultProps = {
  onChange: () => {},
}
SearchField.propTypes = {
  /** Callback when input text has changed */
  onChange: PropTypes.func,
  /** Callback when input was submitted. If missing, submit button will be omitted. */
  onSubmit: PropTypes.func,
  /** Value to be assigned to the input field. */
  value: PropTypes.string,
  /** Placeholder text shown when input field is empty. */
  placeholder: PropTypes.string.isRequired,
  /** Label used to improve accessibility. */
  'aria-label': PropTypes.string,
  /** Additional class applied to the outermost box. */
  className: PropTypes.string,
}
export default SearchField
