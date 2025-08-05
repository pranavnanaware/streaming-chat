import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Box,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete, Refresh } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  clearError,
} from '../store/itemSlice';
import { GenericItemCreate, GenericItemUpdate } from '../types';

const ItemManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.items);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleOpen = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ name: item.name, description: item.description || '' });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ name: '', description: '' });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    try {
      if (editingId) {
        const updateData: GenericItemUpdate = {};
        if (formData.name) updateData.name = formData.name;
        if (formData.description) updateData.description = formData.description;
        
        await dispatch(updateItem({ id: editingId, item: updateData })).unwrap();
      } else {
        const createData: GenericItemCreate = {
          name: formData.name,
          description: formData.description || undefined,
        };
        await dispatch(createItem(createData)).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await dispatch(deleteItem(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  const handleRefresh = () => {
    dispatch(fetchItems());
  };

  const clearErrorMessage = () => {
    dispatch(clearError());
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Item Manager
        </Typography>
        <Box>
          <IconButton onClick={handleRefresh} disabled={loading}>
            <Refresh />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
            disabled={loading}
            sx={{ ml: 1 }}
          >
            Add Item
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" onClose={clearErrorMessage} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {item.name}
                </Typography>
                {item.description && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.description}
                  </Typography>
                )}
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Created: {new Date(item.created_at).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" display="block">
                  Updated: {new Date(item.updated_at).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleOpen(item)}
                  disabled={loading}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(item.id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {items.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No items found. Create your first item!
          </Typography>
        </Box>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Item' : 'Create New Item'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name.trim() || loading}
          >
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ItemManager;